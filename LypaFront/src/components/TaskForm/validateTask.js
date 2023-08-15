const badWords = 
[
"dick",
"penis",
"pipisun",
"bolt",
"xuy",
"xui",
"chlen",
"4len",
"4лен",
"4lleH",
"dicker",
"член",
"пенис",
"хуй",
"хер",
"писюн",
"пісюн",
"піпісюн",
"члєн",
"4лєн",
"hui",
"huy",
"fuck",
"fock"
]

export function validateTask(task) {
    const name = task.name.toLowerCase();
    const description = task.description.toLowerCase();
    
    for (const badWord of badWords) {
        const regexPattern = new RegExp(`(${badWord})+`, 'g');
        if (regexPattern.test(name) || regexPattern.test(description)) {
            return false;
        }
    }

    return true;
}