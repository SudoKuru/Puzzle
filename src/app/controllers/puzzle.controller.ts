import {matchedData, query} from "express-validator";

const puzzleService = require('../services/puzzle.service');

async function createPuzzle(req, res, next) {

    console.log("RAW: " + JSON.stringify(req.body, null, 2));
    const allData = Object.values(matchedData(req, { locations: ['body'] }));
    // this is needed because the last element in matchedData array is the original request for some reason.

    console.log("DATA: " + JSON.stringify(allData, null, 2));
    allData.pop();

    console.log("FINAL DATA: " + JSON.stringify(allData, null, 2));
    try {
        // override successful completion code of 200 to 201 for successful object creation
        res.status(201).json(await puzzleService.createPuzzle(allData));
    } catch(err) {
        next(err);
    }
}

async function searchPuzzle(req, res, next) {

    console.log("RAW: " + JSON.stringify(req.query));
    const allData = matchedData(req, { locations: ['query'] });

    console.log("DATA: " + JSON.stringify(allData));

    try {
        res.json(await puzzleService.searchPuzzle(allData));
    } catch(err) {
        next(err);
    }
}

async function updatePuzzle(req, res, next) {

    console.log("RAW: " + JSON.stringify(req.body, null, 2));
    const allData = Object.values(matchedData(req, { locations: ['body'] }));
    // this is needed because the last element in matchedData array is the original request for some reason.

    console.log("DATA: " + JSON.stringify(allData, null, 2));
    allData.pop();
    try {
        res.json(await puzzleService.updatePuzzle(allData));
    } catch(err) {
        next(err);
    }
}

async function removePuzzle(req, res, next) {

    const allData = matchedData(req, { locations: ['query'] });
    try {
        res.json(await puzzleService.removePuzzle(allData));
    } catch(err) {
        next(err);
    }
}

module.exports = {create: createPuzzle, search: searchPuzzle, update: updatePuzzle, remove: removePuzzle }