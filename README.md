# スタートアップ売買サイト比較

海外のスタートアップ・オンラインビジネス売買サイトを比較検討できるインタラクティブWebアプリケーション

## 🚀 特徴

- **23サイト掲載**: 16のビジネス売買サイト + 7のツール販売サイト
- **高度なフィルタリング**: カテゴリ、規模、専門分野で絞り込み
- **比較モード**: 最大3サイトを並べて比較
- **リアルタイム検索**: サイト名や特徴で即座に検索
- **ダークモード**: 目に優しいUI
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ全対応

## 📊 掲載データ

### ビジネス丸ごと売買（16サイト）
- **大規模**: FE International, Empire Flippers, Acquire.com, Flippa
- **中規模**: Website Properties
- **小規模**: Microns.io, SideProjectors
- **ニッチ**: Shopify Exchange, MotionInvest

### ツール・サービス単体販売（7サイト）
- **ライセンス販売**: CodeCanyon, Gumroad
- **Lifetime Deal**: AppSumo, DealMirror
- **コミュニティ**: Indie Hackers, Nugget.one, MicroSaaS.dev

## 🛠️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プロダクションサーバー起動
npm start
```

ブラウザで `http://localhost:3000` を開く

## 🎨 デザインシステム

- **カラーパレット**: ダークモード対応、ブルー/パープルアクセント
- **フォント**: Inter + Noto Sans JP
- **スタイル**: Apple.com + Stripe.com + Linear.app風のクリーンデザイン

## 📁 ディレクトリ構成

```
startup-marketplace-compare/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   ├── data.ts          # 23サイトのデータ
│   └── utils.ts         # ユーティリティ関数
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🔍 使い方

### 基本検索
- 検索バーにサイト名や特徴を入力
- カテゴリ・規模・並び順でフィルタリング
- 専門分野のバッジをクリックして絞り込み

### 比較モード
1. 「比較モード」ボタンをクリック
2. 各カードの「比較」ボタンで最大3サイトを選択
3. 価格帯・手数料・評価・特徴を横並びで比較

## 📈 今後の拡張予定

- [ ] 詳細ページ（各サイトの深掘り情報）
- [ ] レコメンドエンジン（プロジェクトに最適なサイト提案）
- [ ] ユーザーレビュー機能
- [ ] APIデータ連携（リアルタイム更新）
- [ ] 日本のM&Aサイト追加

## 📝 データソース

- 調査日: 2026-03-05
- 調査対象: 23サイト
- 調査方法: Web fetch + 公式サイト情報
- データファイル: `lib/data.ts`

## 🤝 貢献

データの更新や機能追加の提案は歓迎します。

## 📄 ライセンス

MIT License

---

作成者: BK Project  
最終更新: 2026-03-05
