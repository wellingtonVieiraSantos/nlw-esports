# Back-end

## Entidades

### Game
id
title
bannerUrl

para fazer upload das imagens precisaria:
CDN (ex: Amazon S3) (Content Delivery Network) => traria uma url da imagem

### Ad
id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt

dicas:
1:30h -> 90 min
R$ 178,89 -> 17989

Problemas comuns programação:
Datas (fuso horário / formatos diferentes i18n)
Pontos flutuantes

## Casos de uso
-Listagem de games com contagem de anúncios
-Criação de novo anúncio
-Listagem de anúncios por game
-Buscar discord pelo ID do anúncio
