const {
    kcfPepChamp,
    kcfSpRump,
    kcfConcerned,
    kcfCreep,
    sadChamp,
    pog,
    pogChomp,
    pogYou,
    jojo1,
    jojo2,
    jojo3,
    jojo4,
    gun,
    ugh,
    bobDance,
    wall,
    bonkCat,
    pogTasty
} = require("./emojis.config");

const batterUp = [
    `${kcfPepChamp}:tomato:             ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}  :tomato:           ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}    :tomato:         ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}      :tomato:       ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}        :tomato:     ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}          :tomato:   ${kcfSpRump}:newspaper2:`,
    `${kcfPepChamp}            :tomato: :newspaper2:${kcfSpRump}`,
    `${kcfPepChamp}       :tomato::boom::newspaper2:${kcfSpRump}`,
    `${kcfPepChamp}     :tomato:        :newspaper2:${kcfSpRump}`,
    `${kcfPepChamp}   :tomato:          :newspaper2:${kcfSpRump}`,
    `${kcfPepChamp} :tomato:            :newspaper2:${kcfSpRump}`,
    `${kcfPepChamp}:tomato: splat  :newspaper2:${kcfSpRump}`,
    `${kcfPepChamp} “nooo”     :newspaper2:${kcfSpRump} “yaaay!”`
];

const bonk = [
    `⠀${kcfPepChamp}                      :flag_pe:  //says something stubid`,
    `⠀${kcfPepChamp} "hey peru"  :flag_pe:`,
    `⠀${kcfPepChamp}                      :flag_pe: "yeah?"`,
    `⠀ ${kcfPepChamp}                    :flag_pe:`,
    `⠀   ${kcfPepChamp}                  :flag_pe:`,
    `⠀     ${kcfPepChamp}                :flag_pe:`,
    `⠀       ${kcfPepChamp}              :flag_pe:`,
    `⠀         ${kcfPepChamp}            :flag_pe:`,
    `⠀           ${kcfPepChamp}          :flag_pe:`,
    `⠀             ${kcfPepChamp}        :flag_pe:`,
    `⠀               ${kcfPepChamp}      :flag_pe:`,
    `⠀                 ${kcfPepChamp}    :flag_pe:`,
    `⠀                   ${kcfPepChamp}  :flag_pe:`,
    `⠀                     ${kcfPepChamp}:flag_pe:`,
    `⠀                     ${kcfPepChamp}${bonkCat}`
];

const donutTime = [
    `${sadChamp}                  :doughnut:`,
    `${pog}                  :doughnut:`,
    `${pogTasty}                  :doughnut:`,
    `${pogChomp}                  :doughnut:`,
    `${pogChomp}                :doughnut:`,
    `${pogChomp}              :doughnut:`,
    `${pogChomp}            :doughnut:`,
    `${pogChomp}          :doughnut:`,
    `${pogChomp}        :doughnut:`,
    `${pogChomp}      :doughnut:`,
    `${pogChomp}    :doughnut:`,
    `${pogChomp}  :doughnut:`,
    `${pogChomp}:doughnut:`,
    `${pog}`,
    `${pogYou} “yommy!”`
];

const menace = [
    `${kcfConcerned}${gun}`,
    `${kcfConcerned}${gun}${jojo1}`,
    `${kcfConcerned}${gun}${jojo1}${jojo2}`,
    `${kcfConcerned}${gun}${jojo1}${jojo2}${jojo3}`,
    `${kcfConcerned}${gun}${jojo1}${jojo2}${jojo3}${jojo4}`,
];

const adhd = [
    `⠀${kcfSpRump}                      ${bobDance} "hey gab"`,
    `⠀${kcfSpRump} "yeah?"      ${bobDance}`,
    `⠀${kcfSpRump}                      ${bobDance} "that's a symptom ~"`,
    `⠀ ${ugh}                    ${bobDance}`,
    `⠀   ${kcfSpRump}                  ${bobDance}`,
    `⠀     ${kcfSpRump}                ${bobDance}`,
    `⠀       ${kcfSpRump}              ${bobDance}`,
    `⠀         ${kcfSpRump}            ${bobDance}`,
    `⠀           ${kcfSpRump}          ${bobDance}`,
    `⠀             ${kcfSpRump}        ${bobDance}`,
    `⠀               ${kcfSpRump}      ${bobDance}`,
    `⠀                 ${kcfSpRump}    ${bobDance}`,
    `⠀                   ${kcfSpRump}  ${bobDance}`,
    `⠀                     ${kcfSpRump}${bobDance}`,
    `⠀                     ${kcfSpRump}${bonkCat}`
];

const koolaid = [
    `⠀${kcfCreep}         ${wall}`,
    `⠀ ${kcfCreep}        ${wall}`,
    `⠀  ${kcfCreep}       ${wall}`,
    `⠀   ${kcfCreep}      ${wall}`,
    `⠀    ${kcfCreep}     ${wall}`,
    `⠀     ${kcfCreep}    ${wall}`,
    `⠀      ${kcfCreep}   ${wall}`,
    `⠀       ${kcfCreep}  ${wall}`,
    `⠀        ${kcfCreep} ${wall}`,
    `⠀         ${kcfCreep}${wall}`,
    `⠀         :boom:${kcfCreep}`,
    `⠀               ${kcfCreep} "OH YEAH!"`
]

module.exports = {
    "batter-up": {
        frames: batterUp,
        description: "Rat vs Mouse - A timeless tale of revenge."
    },
    "bonk": {
        frames: bonk,
        description: "STFU Peru."
    },
    "donut-time": {
        frames: donutTime,
        description: "An absolute legend and his sweet tooth. **Y O M M Y**"
    },
    "menace": {
        frames: menace,
        description: "Menacing."
    },
    "adhd": {
        frames: adhd,
        description: "All truths are not good to tell."
    },
    "koolaid": {
        frames: koolaid,
        description: "OH YEAH!"
    }
};
