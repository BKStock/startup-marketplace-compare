# Vercelへのデプロイ手順

## 🚀 1クリックデプロイ（推奨）

以下のボタンをクリックするだけでVercelにデプロイできます:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BKStock/startup-marketplace-compare)

または、以下の手順で手動デプロイ:

## 📝 手動デプロイ手順

### 1. Vercelにアクセス
https://vercel.com にアクセスしてGitHubアカウントでログイン

### 2. 新規プロジェクト作成
- 「Add New...」→「Project」をクリック
- または直接 https://vercel.com/new へアクセス

### 3. GitHubリポジトリをインポート
- 「Import Git Repository」から `BKStock/startup-marketplace-compare` を選択
- 「Import」ボタンをクリック

### 4. ビルド設定（自動検出）
以下の設定が自動で入力されます:
- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

そのまま「Deploy」ボタンをクリック

### 5. デプロイ完了
2-3分でデプロイが完了し、公開URLが発行されます:
- 例: `https://startup-marketplace-compare.vercel.app`

## 🔄 自動デプロイ

一度Vercelにデプロイすると、以降はGitHubへのpushで自動デプロイされます:

```bash
git add .
git commit -m "Update data"
git push
```

→ 自動的にVercelが検知してデプロイ（約2分）

## 🌐 カスタムドメイン設定

Vercelのプロジェクト設定から独自ドメインを設定可能:
1. プロジェクトの「Settings」→「Domains」
2. ドメイン名を入力
3. DNS設定を追加（Vercelが手順を表示）

## 💡 デプロイステータス確認

- Vercelダッシュボード: https://vercel.com/dashboard
- デプロイログで詳細確認可能
- ビルドエラーがあれば詳細表示

---

**所要時間**: 初回5分、以降は自動（2分）
