# Spyfall
Simple Spyfall game implementation for practice  
React/Redux + Socket.IO  

## Setup

### Local Development
```bash
npm ci && npm run demo
```
or separately  
```bash
npm ci
npm run demo
```

### Docker
```bash
# Или сборка и запуск Docker образа вручную
docker build -t spyfall .
docker run -p 8080:8080 -p 42069:42069 spyfall
```

## Howto
- Create room
- Send invite room Id to someone

## Features
Demo mode - just enough to try

## Docker

Приложение доступно на портах:
- **8080** - Web интерфейс
- **42069** - Socket.IO сервер для мультиплеера

### GitHub Actions

Проект настроен с автоматической сборкой Docker образа через GitHub Actions. При каждом push в master ветку или при создании тега, образ автоматически собирается и публикуется в registry.

Для настройки автоматической публикации необходимо добавить секреты в GitHub repository:
- `REGISTRY` - адрес registry (например: `docker.io`, `ghcr.io`, `your-registry.com`)
