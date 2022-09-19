
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())

app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

//HTTP methods / API RESTful / HTTP Codes - principais 200, 300, 400, 500
//criando as rotas dos casos de uso

/* Params são 3 tipos
Query: ?, ex: /ads?page=2 - persistir estado da pagina
Route: ex: /ads/nome-do-post - identificar um recurso
Body: envio de várias informaçoes - ex um formulário -nao fica visivel na url, bom para info sensiveis
*/

//listagem de games
app.get('/games', async(request, response)=>{
    const games =  await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    })
    return response.json(games)
})

//criação de anuncio
app.post('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id

    const body= request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHoursStringToMinutes(body.hourStart),
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad)
})

//listagem de anuncios por game
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad =>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }))
})

//buscar discord por anuncio
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.listen(3333)