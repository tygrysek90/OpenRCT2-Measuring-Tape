/**
 * Break object name over line in nice way
 * @param str object name in format rctx.something.someobject
 * @returns string with {NEWLINE} inserted before second "."
 */
export function breakObjectName(str: string): string {
    let splited = str.split(".")
    if (splited.length == 3) {
        return `${splited[0]}.${splited[1]}{NEWLINE}.${splited[2]}`
    }
    else {
        return str
    }
}