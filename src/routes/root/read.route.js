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
        let doc = yaml.load(fs.readFileSync(path.resolve(__dirname, `../../../db/articles/${a}.yaml`), 'utf8'))
        let article
        if(doc.body.format === 'markdown'){
            article = MarkdownIt.render(doc.body.value)
        } //what other format?
        console.log(req.app.get("views"))
        doc.body.display = article
        res.render(path.resolve(__dirname, '../../../dist/index.ejs'), {doc})
    } catch (e) {
        console.log(e);
        //404
        next(e)
    }
    
})

module.exports = router;