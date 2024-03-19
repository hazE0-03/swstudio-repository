## 目次
1. [概要](#概要)
2. [背景](#背景)
3. [使い方](#使い方)
4. [使用技術](#使用技術)
5. [構成](#構成)

## 概要
「そどわすたじお」は、「ソード・ワールド2.5」のキャラクターシート作成、管理、出力などを支援するWEBアプリケーションです。「グループＳＮＥ」及び「株式会社ＫＡＤＯＫＡＷＡ」が権利を有する『ソード・ワールド2.5』の、二次創作です。
(C)GroupSNE
(C)KADOKAWA

## 背景
私は現在、大学のTRPGサークルに所属しています。
このプロダクトは、所属サークルで活発に遊ばれている「ソードワールド2.5」(以下sw2.5)において、メンバー達が既存のキャラクターシート(以下キャラシ)作成、管理サイトに不満を持っていることから、開発を始めました。
今まで利用させていただいていたサイトに感謝を忘れず、sw2.5を遊ぶ人のエクスペリエンスの向上に役立てることを目指しています。

## 使い方

## 使用技術
フロントエンド：JavaScript
バックエンド：Python, FastAPI
インフラ：
データベース：
その他：Git, GitHub

## 構成
sw_studio
├── README.md
├── app/
|    └── main.py
├── modules/
|    └── __init__.py
├── templates/
|    └── index.html
├── database/
├── assets/
|    ├── css/
|    |    └── style.css
|    ├── js/
|    |    └── script.js
|    └── image/
└── tests/
