"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash, ArrowUp, ArrowDown, Save, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  skills: string[];
  coverImage: string;
  period: string;
  tier: number;
  layout: "full" | "half" | "third";
  links: {
    caseStudy?: string;
    figmaUrl?: string;
    liveUrl?: string;
    behanceUrl?: string;
  };
  visible: boolean;
  techTokens?: string[];
  specInfo?: {
    components: string;
    whitelabelConfig: string;
    states: string;
  };
  caseStudyContent?: {
    overview: string;
    problem: string;
    solution: string;
    result: string;
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(() => setError("Không thể tải danh sách dự án."));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    // Check password by testing a mock request
    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, projects })
    })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
          setError("");
          // Save password in session storage so reload doesn't lock user out
          sessionStorage.setItem("admin_password", password);
        } else {
          setError("Mật khẩu không chính xác.");
        }
      })
      .catch(() => setError("Lỗi kết nối server."));
  };

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_password");
    if (saved) {
      setPassword(saved);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSaveAll = () => {
    setIsSaving(true);
    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, projects })
    })
      .then(res => {
        if (res.ok) {
          alert("Lưu cơ sở dữ liệu thành công! Hãy commit thay đổi để cập nhật.");
        } else {
          setError("Lỗi lưu dữ liệu. Hãy đăng nhập lại.");
          setIsLoggedIn(false);
        }
      })
      .catch(() => setError("Lỗi kết nối."))
      .finally(() => setIsSaving(false));
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= projects.length) return;

    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[nextIndex];
    reordered[nextIndex] = temp;
    setProjects(reordered);
  };

  const toggleVisibility = (index: number) => {
    const updated = [...projects];
    updated[index].visible = !updated[index].visible;
    setProjects(updated);
  };

  const deleteProject = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dự án này?")) return;
    setProjects(projects.filter(p => p.id !== id));
    if (activeProject?.id === id) setActiveProject(null);
  };

  const createNewProject = () => {
    const newProj: Project = {
      id: `new-project-${Date.now()}`,
      title: "Dự án mới",
      tags: ["SaaS", "Dashboard"],
      summary: "Mô tả ngắn gọn về dự án.",
      skills: ["UX Design", "Wireframe"],
      coverImage: "dashboard",
      period: "2025",
      tier: 2,
      layout: "third",
      links: {},
      visible: false,
      techTokens: ["Next.js", "Tailwind CSS"],
      specInfo: {
        components: "ComponentA, ComponentB",
        whitelabelConfig: "ThemeKey",
        states: "Active, Inactive"
      },
      caseStudyContent: {
        overview: "Tổng quan dự án",
        problem: "Vấn đề đặt ra",
        solution: "Giải pháp thực hiện",
        result: "Kết quả đạt được"
      }
    };
    setProjects([...projects, newProj]);
    setActiveProject(newProj);
  };

  const updateActiveProjectField = (field: keyof Project, value: any) => {
    if (!activeProject) return;
    const updatedProj = { ...activeProject, [field]: value };
    setActiveProject(updatedProj);
    setProjects(projects.map(p => p.id === activeProject.id ? updatedProj : p));
  };

  const updateActiveProjectNested = (parent: "links" | "specInfo" | "caseStudyContent", field: string, value: any) => {
    if (!activeProject) return;
    const updatedProj = {
      ...activeProject,
      [parent]: {
        ...activeProject[parent],
        [field]: value
      }
    };
    setActiveProject(updatedProj);
    setProjects(projects.map(p => p.id === activeProject.id ? updatedProj : p));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex items-center justify-center font-sans p-6">
        <div className="w-full max-w-md bg-[#0d1425] border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
              <Lock size={22} />
            </div>
            <h1 className="text-xl font-bold font-serif tracking-tight text-center">ĐĂNG NHẬP ADMIN</h1>
            <p className="text-xs text-slate-400 text-center">Truy cập giao diện quản lý cơ sở dữ liệu dự án</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full bg-[#111c30] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 text-white font-mono"
              />
            </div>
            {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
            >
              Xác thực đăng nhập
            </button>
          </form>

          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mt-6 font-medium">
            <ArrowLeft size={13} />
            Quay lại trang Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] font-sans flex flex-col">
      {/* Header bar */}
      <header className="h-16 border-b border-slate-800 bg-[#0d1425]/80 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-serif font-bold text-lg">
            T
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block">PORTFOLIO CMS</span>
            <span className="text-[10px] text-brand-400 block -mt-1 font-mono uppercase tracking-wider">Database Manager</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all duration-300 shadow-md shadow-brand-500/10"
          >
            <Save size={13} />
            {isSaving ? "Đang lưu..." : "Lưu Thay Đổi"}
          </button>
          
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_password");
              setIsLoggedIn(false);
            }}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 grid lg:grid-cols-[340px_1fr] overflow-hidden">
        {/* Left Sidebar - List of Projects */}
        <div className="border-r border-slate-800 bg-[#0c1221] p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider font-mono text-slate-400 uppercase">Danh sách dự án</h2>
            <button
              onClick={createNewProject}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
              title="Thêm dự án mới"
            >
              <Plus size={15} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
                  activeProject?.id === proj.id
                    ? "bg-brand-500/10 border-brand-500 text-white shadow-md shadow-brand-500/5"
                    : "bg-[#0d1425] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold truncate pr-2 block">
                    {proj.title}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleVisibility(idx); }}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      {proj.visible ? <Eye size={12} className="text-brand-500" /> : <EyeOff size={12} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded uppercase">Tier {proj.tier}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveProject(idx, "up"); }}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                    >
                      <ArrowUp size={10} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveProject(idx, "down"); }}
                      disabled={idx === projects.length - 1}
                      className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
                    >
                      <ArrowDown size={10} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteProject(proj.id); }}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400"
                    >
                      <Trash size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane - Form Editor */}
        <div className="p-8 overflow-y-auto bg-[#090d16]">
          {activeProject ? (
            <div className="max-w-3xl flex flex-col gap-8">
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight dark:text-white">Chi tiết: {activeProject.title}</h2>
                  <span className="text-xs font-mono text-slate-400 mt-1 block">ID: {activeProject.id}</span>
                </div>
              </div>

              {/* Basic configuration */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Tiêu đề dự án</label>
                  <input
                    type="text"
                    value={activeProject.title}
                    onChange={e => updateActiveProjectField("title", e.target.value)}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Thời gian (Period)</label>
                  <input
                    type="text"
                    value={activeProject.period}
                    onChange={e => updateActiveProjectField("period", e.target.value)}
                    placeholder="e.g. 2025 – nay"
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Ảnh bìa (SVG mockup name)</label>
                  <select
                    value={activeProject.coverImage}
                    onChange={e => updateActiveProjectField("coverImage", e.target.value)}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  >
                    <option value="dashboard">Dashboard (Dark gray widget grid)</option>
                    <option value="smarthome">Smart Home (Mobile layout control)</option>
                    <option value="austfly">Austfly (Before/After split)</option>
                    <option value="factory">Factory (Industrial desktop app)</option>
                    <option value="branding">Branding (Sleek startup identity)</option>
                    <option value="medical">Medical (B2B Dental catalog web)</option>
                  </select>
                </div>
              </div>

              {/* Tier & Layout config */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Phân loại (Tier)</label>
                  <select
                    value={activeProject.tier}
                    onChange={e => updateActiveProjectField("tier", parseInt(e.target.value))}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  >
                    <option value={1}>Featured Projects (Tier 1)</option>
                    <option value={2}>More Projects (Tier 2)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Bố cục hiển thị (Layout)</label>
                  <select
                    value={activeProject.layout}
                    onChange={e => updateActiveProjectField("layout", e.target.value)}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500"
                  >
                    <option value="full">Chiều rộng 100% (full-width)</option>
                    <option value="half">Chiều rộng 50% (half-width)</option>
                    <option value="third">Chiều rộng 33.3% (third-width)</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end pb-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={activeProject.visible}
                      onChange={e => updateActiveProjectField("visible", e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-[#0d1425] text-brand-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-xs font-semibold text-slate-300">Hiển thị công khai trên website</span>
                  </label>
                </div>
              </div>

              {/* Tags & Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">
                    Tags (Phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={activeProject.tags.join(", ")}
                    onChange={e => updateActiveProjectField("tags", e.target.value.split(",").map(s => s.trim()))}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">
                    Skills Pills (Phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={activeProject.skills.join(", ")}
                    onChange={e => updateActiveProjectField("skills", e.target.value.split(",").map(s => s.trim()))}
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Summary description */}
              <div>
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Mô tả tóm tắt (2-3 dòng)</label>
                <textarea
                  rows={3}
                  value={activeProject.summary}
                  onChange={e => updateActiveProjectField("summary", e.target.value)}
                  className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 leading-relaxed"
                />
              </div>

              {/* Hyperlinks */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 mb-4">Đường liên kết</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Live demo url</label>
                    <input
                      type="text"
                      value={activeProject.links.liveUrl || ""}
                      onChange={e => updateActiveProjectNested("links", "liveUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Figma spec url</label>
                    <input
                      type="text"
                      value={activeProject.links.figmaUrl || ""}
                      onChange={e => updateActiveProjectNested("links", "figmaUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Behance CS url</label>
                    <input
                      type="text"
                      value={activeProject.links.behanceUrl || ""}
                      onChange={e => updateActiveProjectNested("links", "behanceUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Dev Redline Spec details */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 mb-4">Thông tin kỹ thuật (Handoff Redline Tokens)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Components mapped</label>
                    <input
                      type="text"
                      value={activeProject.specInfo?.components || ""}
                      onChange={e => updateActiveProjectNested("specInfo", "components", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Whitelabel Config variables</label>
                    <input
                      type="text"
                      value={activeProject.specInfo?.whitelabelConfig || ""}
                      onChange={e => updateActiveProjectNested("specInfo", "whitelabelConfig", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Logic state states</label>
                    <input
                      type="text"
                      value={activeProject.specInfo?.states || ""}
                      onChange={e => updateActiveProjectNested("specInfo", "states", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Case study Content */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 mb-4">Nội dung Case Study</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Tổng quan (Overview)</label>
                    <textarea
                      rows={3}
                      value={activeProject.caseStudyContent?.overview || ""}
                      onChange={e => updateActiveProjectNested("caseStudyContent", "overview", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Vấn đề đặt ra (Problem)</label>
                    <textarea
                      rows={3}
                      value={activeProject.caseStudyContent?.problem || ""}
                      onChange={e => updateActiveProjectNested("caseStudyContent", "problem", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Giải pháp thiết kế (Solution)</label>
                    <textarea
                      rows={3}
                      value={activeProject.caseStudyContent?.solution || ""}
                      onChange={e => updateActiveProjectNested("caseStudyContent", "solution", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">Kết quả đạt được (Result)</label>
                    <textarea
                      rows={3}
                      value={activeProject.caseStudyContent?.result || ""}
                      onChange={e => updateActiveProjectNested("caseStudyContent", "result", e.target.value)}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-2 text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-3">
              <div className="w-16 h-16 rounded-full bg-slate-800/30 flex items-center justify-center text-slate-600">
                <Unlock size={26} />
              </div>
              <p className="text-sm text-slate-500 font-medium">Chọn một dự án từ thanh bên hoặc tạo mới để bắt đầu chỉnh sửa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
