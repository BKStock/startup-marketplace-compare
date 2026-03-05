# Vercel 1クリックデプロイリンク

以下のリンクをクリックするだけでVercelにデプロイできます:

## 🚀 デプロイリンク

### 方法1: 1クリックデプロイ（最速）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BKStock/startup-marketplace-compare)

👆 このボタンをクリックして:
1. Vercelアカウントでログイン（GitHubアカウント推奨）
2. 「Deploy」ボタンをクリック
3. 2-3分待つ
4. 公開URL発行！

### 方法2: 既存リポジトリをインポート
https://vercel.com/new/git/external?repository-url=https://github.com/BKStock/startup-marketplace-compare

1. Vercelにログイン
2. 「Import」をクリック
3. 「Deploy」をクリック
4. 完了！

## 📱 デプロイ後のURL

Vercelが自動生成するURL:
- **本番**: `https://startup-marketplace-compare.vercel.app`
- **プレビュー**: `https://startup-marketplace-compare-git-master-bkstock.vercel.app`

## 🔄 更新方法

一度デプロイすれば、GitHubへのpushで自動デプロイされます:
```bash
# ローカルで変更
git add .
git commit -m "Update"
git push

# → Vercelが自動検知して2分で更新！
```

## 💡 所要時間
- 初回デプロイ: **3-5分**
- 更新デプロイ: **自動（2分）**
