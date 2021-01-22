const path = require('path')
const express = require('express')
const yaml = require('js-yaml');
const fs   = require('fs');
const MarkdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
})

const router = express.Router()

router.get('', function (req, res, next) {
    try {
        //discover articles
        const articles = fs.readdirSync(path.resolve(__dirname, '../../../db/articles/'))
        //remove extension
        const items = articles.map(a => {
            return a.split('.')[0]
        })
        res.render(path.resolve(__dirname, '../../../dist/index.ejs'), {articles: items})
    } catch (e) {
        console.log(e);
        //404
        next(e)
    }
    
})

module.exports = router;