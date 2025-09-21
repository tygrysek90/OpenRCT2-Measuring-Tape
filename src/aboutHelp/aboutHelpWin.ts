import { Colour, label, tab, tabwindow,  } from "openrct2-flexui";
import { pluginVersion } from "../version";
import { iPng } from "../imgs/i";
import { questionMarkPng } from "../imgs/questionMark";


const tabHeiht = 200

export const aboutHelpWindow = tabwindow({
    title: "Measuring Tape - Info",
    width: 360,
    height: "auto" ,
    position: "center",
    colours: [Colour.DarkBrown, Colour.DarkBrown, Colour.Grey],
    tabs: [
        tab({image: iPng.image,
            content:[
                label({
                    height:tabHeiht,
                    text: `{YELLOW}openrct2-measuring-tape{TOPAZ} - v. ${pluginVersion}{NEWLINE}{NEWLINE}{WHITE}(c) 2025 by {TOPAZ}Ríša Szlachta (tygrysek90){NEWLINE}{WHITE}Licensed GPL-3.0{NEWLINE}{NEWLINE}{PALEGOLD}https://github.com/tygrysek90/{NEWLINE}(come check for updates){WHITE}{NEWLINE}{NEWLINE}This plugin uses awesome works from {TOPAZ}Basssiiie{WHITE}:{NEWLINE}OpenRCT2-Simple-Typescript-Template{NEWLINE}OpenRCT2-FlexUI{NEWLINE}OpenRCT2-ProxyPather{NEWLINE}{NEWLINE}And utilizes tiny piece of code from {TOPAZ}Sadret{NEWLINE}Some of button images are made on basis of g2.dat icons{NEWLINE}originally by OpenRCT2 Authors`
                    })
        
            ]
        }),
        tab({image: questionMarkPng.image,
            content:[
                label({
                    height:tabHeiht,
                    text: "{YELLOW}A message from author of plugin:{NEWLINE}{NEWLINE}{WHITE}I hope all user interface and functions are enough{NEWLINE}self explanatory.If you need help, want to suggest{NEWLINE}or ask for a feature to be added, report an bug or cooperate in{NEWLINE}some way, feel free to contact me,{NEWLINE}via OpenRCT2 discord @tygrysek90 or via GitHub{NEWLINE}{NEWLINE}Have a pleasing day!"
                    })
        
            ]
        })
    ]

})