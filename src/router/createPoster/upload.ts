import express from 'express'
import { createPosterMiddleWareNextParams } from './interface'

export async function upload(req: createPosterMiddleWareNextParams, res: express.Response) {
    console.log(req.body)
}