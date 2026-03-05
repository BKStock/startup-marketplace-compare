"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ExternalLink,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { platforms, categories, subcategories, specialtyFilters } from "@/lib/data";
import { formatCurrency, getCategoryLabel, getSubcategoryLabel } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating">("name");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredPlatforms = useMemo(() => {
    let filtered = platforms.filter((platform) => {
      const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platform.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || platform.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === "all" || platform.subcategory === selectedSubcategory;
      const matchesSpecialty = selectedSpecialty.length === 0 || 
        selectedSpecialty.some(spec => platform.specialties.includes(spec));

      return matchesSearch && matchesCategory && matchesSubcategory && matchesSpecialty;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceRange.min - b.priceRange.min;
        case "price-high":
          return b.priceRange.max - a.priceRange.max;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedSpecialty, sortBy]);

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const comparedPlatforms = platforms.filter(p => selectedForCompare.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                スタートアップ売買サイト比較
              </h1>
              <p className="text-gray-400 mt-1">23サイトを徹底比較・検索</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={compareMode ? "default" : "outline"}
                onClick={() => setCompareMode(!compareMode)}
              >
                {compareMode ? "比較モード終了" : "比較モード"}
                {selectedForCompare.length > 0 && ` (${selectedForCompare.length})`}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="サイト名や特徴で検索..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              {subcategories.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">名前順</option>
              <option value="price-low">価格（安い順）</option>
              <option value="price-high">価格（高い順）</option>
              <option value="rating">評価順</option>
            </select>
          </div>

          {/* Specialty Filters */}
          <div className="flex flex-wrap gap-2">
            {specialtyFilters.map((spec) => (
              <Badge
                key={spec}
                variant={selectedSpecialty.includes(spec) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-500/20 transition-colors"
                onClick={() => {
                  if (selectedSpecialty.includes(spec)) {
                    setSelectedSpecialty(selectedSpecialty.filter(s => s !== spec));
                  } else {
                    setSelectedSpecialty([...selectedSpecialty, spec]);
                  }
                }}
              >
                {spec}
              </Badge>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-gray-400 text-sm">
            {filteredPlatforms.length}件のサイトが見つかりました
          </div>
        </motion.div>

        {/* Comparison View */}
        {compareMode && selectedForCompare.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">比較表 ({selectedForCompare.length}/3)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4">項目</th>
                    {comparedPlatforms.map((platform) => (
                      <th key={platform.id} className="py-3 px-4 min-w-[200px]">
                        {platform.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">価格帯</td>
                    {comparedPlatforms.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        {formatCurrency(p.priceRange.min)} - {formatCurrency(p.priceRange.max)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">手数料</td>
                    {comparedPlatforms.map((p) => (
                      <td key={p.id} className="py-3 px-4">{p.fee}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">評価</td>
                    {comparedPlatforms.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        {p.rating ? `⭐ ${p.rating}` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">特徴</td>
                    {comparedPlatforms.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        <div className="space-y-1">
                          {p.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="text-xs text-gray-400">• {f}</div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full bg-gray-800 border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{platform.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {getCategoryLabel(platform.category)} • {getSubcategoryLabel(platform.subcategory)}
                      </CardDescription>
                    </div>
                    {platform.rating && (
                      <Badge variant="secondary" className="ml-2">
                        <Star size={12} className="mr-1" />
                        {platform.rating}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
                    <DollarSign size={20} />
                    {formatCurrency(platform.priceRange.min)} - {formatCurrency(platform.priceRange.max)}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {platform.specialties.slice(0, 3).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Sparkles size={14} />
                      主な機能
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {platform.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Pros */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-green-400">
                      <CheckCircle2 size={14} />
                      メリット
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {platform.pros.slice(0, 2).map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-red-400">
                      <XCircle size={14} />
                      デメリット
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {platform.cons.slice(0, 2).map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-700">
                    {platform.userBase && (
                      <div className="text-xs">
                        <Users size={12} className="inline mr-1 text-gray-400" />
                        <span className="text-gray-400">{platform.userBase}</span>
                      </div>
                    )}
                    {platform.dealVolume && (
                      <div className="text-xs">
                        <TrendingUp size={12} className="inline mr-1 text-gray-400" />
                        <span className="text-gray-400">{platform.dealVolume}</span>
                      </div>
                    )}
                    <div className="text-xs col-span-2">
                      <span className="text-gray-500">手数料: </span>
                      <span className="text-gray-300">{platform.fee}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => window.open(platform.url, "_blank")}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      サイトへ
                    </Button>
                    {compareMode && (
                      <Button
                        variant={selectedForCompare.includes(platform.id) ? "secondary" : "outline"}
                        onClick={() => toggleCompare(platform.id)}
                        disabled={!selectedForCompare.includes(platform.id) && selectedForCompare.length >= 3}
                      >
                        {selectedForCompare.includes(platform.id) ? "✓" : "比較"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPlatforms.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Filter size={48} className="mx-auto mb-4 opacity-50" />
            <p>条件に一致するサイトが見つかりませんでした</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 bg-gray-900/50 backdrop-blur-xl py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>データ最終更新: 2026-03-05</p>
          <p className="mt-2">全23サイト掲載 • ビジネス売買 16サイト • ツール販売 7サイト</p>
        </div>
      </footer>
    </div>
  );
}
