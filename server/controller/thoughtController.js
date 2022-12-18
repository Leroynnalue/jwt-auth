import asyncHandler from 'express-async-handler'

// importing models
import Thought from "../models/thoughtModel.js"

// @desc    get thoughts
export const getThoughts = asyncHandler(async (req, res) => {
    const thoughts = await Thought.findAll({
        where: {
            userID: req.user.id
        }
    })

    res.json({
        thoughts
    })
})

// @desc    get a thought
export const getThought = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Thought Not Found")
    }

    const found = await Thought.findByPk(req.params.id)

    if (found) {
        res.json({
            found
        })
    } else {
        res.status(400)
        throw new Error("Thought Not Found")
    }
})

// @desc    creates a thought
export const setThought = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error("Please Insert Some Text")
    }

    const thought = await Thought.create({
        text: req.body.text,
        userID: req.user.userID
    })
    res.json({
        thought
    })
})

// @desc    update a thought
export const updateThought = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Thought Not Found")
    }

    const found = await Thought.findByPk(req.params.id)

    if (found) {
        await Thought.update({
            text: req.body.text
        }, {
            where: {
                id: req.params.id
            }
        })
        res.send({
            found
        })
    } else {
        res.status(400)
        throw new Error("Thought Not Found")
    }
})

// @desc    deletes a thought
export const deleteThought = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        throw new Error("Thought Not Found")
    }

    const found = await Thought.findByPk(req.params.id)

    if (found) {
        await Thought.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: "Deleted"
        })
    } else {
        res.status(400)
        throw new Error("Thought Not Found")
    }
})