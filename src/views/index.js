import './_index.scss'

import tippy, {followCursor, inlinePositioning} from 'tippy.js';
import 'tippy.js/dist/tippy.css';

//setup tippy 
tippy.setDefaultProps({
    allowHTML: true,
    animation: 'fade',
    placement: 'bottom',
    inertia: true,
    interactive: false
})

const VALID_TYPES = [
    'h', 'hedged',
    'i', 'implicative',
    'f', 'factive',
    'a', 'assertive',
    's', 'subjective',
    't', 'trigger'
]

//instanciate
tippy('mark', {
    interactive: true,
    appendTo: document.body,
    followCursor: true,
    inlinePositioning: true,
    plugins: [followCursor, inlinePositioning],
    content(ref) {
        const classes = ref.className.split(' ')
        const type = classes.filter(cl => VALID_TYPES.includes(cl))
        if(type) {
            //use first letter of first match
            const t = type[0][0]
            const tpl = document.getElementById(`tpl-tippy-${t}`)
            return tpl.innerHTML
        } else {
            return false
        }
    }
})