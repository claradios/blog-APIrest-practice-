// Tiene definidos los métodos de la API REST para offensive words. 
// Usa un router configurado en Express.

const express = require('express');
const routerOffensiveWords = express.Router();
const repository = require('../../repository');
const defOffensiveWords = require('../../defOffensiveWords.js');
routerOffensiveWords.post('/', async (req, res) => {
    // - POST Creación,*/offensivewords*
    const offensiveWord = req.body;
    //Validation
    if (typeof offensiveWord.word != 'string' ||
        typeof offensiveWord.level != 'number'
    ) {
        console.log('petition BODY is not correct');
        res.sendStatus(400);
    } else {
        await repository.offensiveWordsCol.addOffensiveWord(offensiveWord);
        res.json(offensiveWord);
    }
});

routerOffensiveWords.get('/', async (req, res) => {
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();       
    res.json(allWords);
});

routerOffensiveWords.get('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id)
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        res.json(offensiveWord);
    }
});

routerOffensiveWords.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        await repository.offensiveWordsCol.deleteOffensiveWordById(id);
        res.json(offensiveWord);
    }
});

routerOffensiveWords.put('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
    console.log(id);
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        const offensiveWordReq = req.body;
        console.log(offensiveWordReq);
        //Validation
        if (
            typeof offensiveWordReq.word != 'string' ||
            typeof offensiveWordReq.level != 'number'
        ) {
            res.sendStatus(400);
            console.log('something went wrong on petitions body');
        } else {
            console.log('body is alright, we are working on modifying your word.Thanks');
            //Update resource
            await repository.offensiveWordsCol.modifyOffensiveWordById(id, offensiveWordReq);
            //Return new resource         
            res.json(offensiveWordReq);
        }
    }
});

module.exports = routerOffensiveWords;
