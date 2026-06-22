"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Lock,
  Plus,
  Save,
  Trash2,
  User,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import type { PortfolioData, Project, Profile } from "@/types/portfolio";

type Tab = "profile" | "projects";

function generateId(): string {
  return `proj-${Date.now().toString(36)}`;
}

function emptyProject(): Project {
  return {
    id: generateId(),
    title: "",
    tagline: "",
    description: "",
    tags: [],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    featured: false,
    createdAt: new Date().toISOString().split("T")[0],
  };
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [tab, setTab] = useState<Tab>("profile");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const json = (await res.json()) as PortfolioData;
      setData(json);
    } catch {
      setMessage({ type: "error", text: "加载数据失败" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = () => {
    if (password.trim()) {
      setAuthenticated(true);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 401) {
          throw new Error("密码错误，请检查 ADMIN_PASSWORD 环境变量");
        }
        throw new Error(err.error || "保存失败");
      }

      const saved = (await res.json()) as PortfolioData;
      setData(saved);
      setMessage({ type: "success", text: "保存成功！首页已同步更新" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "保存失败，请检查密码",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (updates: Partial<Profile>) => {
    if (!data) return;
    setData({ ...data, profile: { ...data.profile, ...updates } });
  };

  const updateProfileSocial = (key: keyof Profile["social"], value: string) => {
    if (!data) return;
    setData({
      ...data,
      profile: {
        ...data.profile,
        social: { ...data.profile.social, [key]: value || undefined },
      },
    });
  };

  const updateSkills = (skillsStr: string) => {
    updateProfile({ skills: skillsStr.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  const addProject = () => {
    const project = emptyProject();
    setEditingProject(project);
  };

  const saveProject = () => {
    if (!data || !editingProject) return;

    const exists = data.projects.find((p) => p.id === editingProject.id);
    const projects = exists
      ? data.projects.map((p) => (p.id === editingProject.id ? editingProject : p))
      : [...data.projects, editingProject];

    setData({ ...data, projects });
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    if (!data) return;
    if (!confirm("确定删除此项目？")) return;
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
    if (editingProject?.id === id) setEditingProject(null);
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="glass w-full max-w-md rounded-2xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/10">
              <Lock className="h-5 w-5 text-accent-violet" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">管理面板</h1>
              <p className="text-sm text-white/40">输入密码以编辑作品集</p>
            </div>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="管理员密码"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet/50"
          />

          <p className="mt-2 text-xs text-white/30">
            本地开发默认密码: admin · 生产环境请设置 ADMIN_PASSWORD 环境变量
          </p>

          <button
            onClick={handleLogin}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet py-3 text-sm font-semibold text-surface transition-opacity hover:opacity-90"
          >
            进入管理
          </button>

          <Link href="/" className="mt-4 flex items-center justify-center gap-1 text-xs text-white/40 hover:text-white/60">
            <ArrowLeft className="h-3 w-3" /> 返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-cyan" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="mb-2 flex items-center gap-1 text-xs text-white/40 hover:text-white/60">
              <ArrowLeft className="h-3 w-3" /> 返回首页
            </Link>
            <h1 className="font-display text-2xl font-bold">作品集管理</h1>
            <p className="text-sm text-white/40">
              最后更新: {new Date(data.updatedAt).toLocaleString("zh-CN")}
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-6 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            保存并同步
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm ${
              message.type === "success"
                ? "border border-accent-lime/30 bg-accent-lime/10 text-accent-lime"
                : "border border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-6 flex gap-2">
          <TabButton active={tab === "profile"} onClick={() => setTab("profile")} icon={<User className="h-4 w-4" />} label="个人信息" />
          <TabButton active={tab === "projects"} onClick={() => setTab("projects")} icon={<FolderOpen className="h-4 w-4" />} label="项目管理" />
        </div>

        {tab === "profile" && (
          <div className="glass space-y-4 rounded-2xl p-6">
            <Field label="姓名" value={data.profile.name} onChange={(v) => updateProfile({ name: v })} />
            <Field label="头衔" value={data.profile.title} onChange={(v) => updateProfile({ title: v })} />
            <Field label="标语" value={data.profile.tagline} onChange={(v) => updateProfile({ tagline: v })} />
            <Field label="简介" value={data.profile.bio} onChange={(v) => updateProfile({ bio: v })} multiline />
            <Field label="头像 URL" value={data.profile.avatarUrl} onChange={(v) => updateProfile({ avatarUrl: v })} />
            <Field label="位置" value={data.profile.location} onChange={(v) => updateProfile({ location: v })} />
            <Field label="邮箱" value={data.profile.email} onChange={(v) => updateProfile({ email: v })} />
            <Field label="技能 (逗号分隔)" value={data.profile.skills.join(", ")} onChange={updateSkills} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub" value={data.profile.social.github || ""} onChange={(v) => updateProfileSocial("github", v)} />
              <Field label="Twitter" value={data.profile.social.twitter || ""} onChange={(v) => updateProfileSocial("twitter", v)} />
              <Field label="LinkedIn" value={data.profile.social.linkedin || ""} onChange={(v) => updateProfileSocial("linkedin", v)} />
              <Field label="Website" value={data.profile.social.website || ""} onChange={(v) => updateProfileSocial("website", v)} />
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="space-y-4">
            <button
              onClick={addProject}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-4 text-sm text-white/50 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
            >
              <Plus className="h-4 w-4" /> 添加新项目
            </button>

            {data.projects.map((project) => (
              <div key={project.id} className="glass flex items-center justify-between rounded-xl p-4">
                <div>
                  <h3 className="font-medium">{project.title || "未命名项目"}</h3>
                  <p className="text-xs text-white/40">{project.tagline}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProject({ ...project })}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-white/20"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:border-red-500/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {editingProject && (
              <div className="glass space-y-4 rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold">
                  {data.projects.find((p) => p.id === editingProject.id) ? "编辑项目" : "新建项目"}
                </h3>
                <Field label="标题" value={editingProject.title} onChange={(v) => setEditingProject({ ...editingProject, title: v })} />
                <Field label="副标题" value={editingProject.tagline} onChange={(v) => setEditingProject({ ...editingProject, tagline: v })} />
                <Field label="描述" value={editingProject.description} onChange={(v) => setEditingProject({ ...editingProject, description: v })} multiline />
                <Field
                  label="标签 (逗号分隔)"
                  value={editingProject.tags.join(", ")}
                  onChange={(v) =>
                    setEditingProject({
                      ...editingProject,
                      tags: v.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
                <Field label="封面图 URL" value={editingProject.imageUrl} onChange={(v) => setEditingProject({ ...editingProject, imageUrl: v })} />
                <Field label="Demo 链接" value={editingProject.demoUrl || ""} onChange={(v) => setEditingProject({ ...editingProject, demoUrl: v || undefined })} />
                <Field label="仓库链接" value={editingProject.repoUrl || ""} onChange={(v) => setEditingProject({ ...editingProject, repoUrl: v || undefined })} />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded"
                  />
                  设为 Featured 精选
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={saveProject}
                    className="rounded-xl bg-accent-cyan/20 px-4 py-2 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/30"
                  >
                    确认
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="rounded-xl px-4 py-2 text-sm text-white/40 hover:text-white/60"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all ${
        active
          ? "bg-white/10 text-white"
          : "text-white/40 hover:text-white/60"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-white/40">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-violet/50"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-violet/50"
        />
      )}
    </div>
  );
}
