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

router.get('/:a', function (req, res, next) {
    const { a } = req.params
    
    try {
        const doc = yaml.load(fs.readFileSync(path.resolve(__dirname, `../../../dist/articles/${a}.yaml`), 'utf8'))
        let article
        if(doc.body.format === 'markdown'){
            article = MarkdownIt.render(doc.body.value)
        }
        //what other format?
        res.render(path.resolve(__dirname, '../../../dist/index.ejs'), {title: doc.title, author: doc.author, article})
    } catch (e) {
        console.log(e);
        //404
        next(e)
    }
    
})

module.exports = router;