export function titleCase(text: string): string {
    const words = text.replace(/^is/, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')

    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase()
        if ( ! ['to', 'in'].includes(word)) {
            switch (word) {
                case 'udp':
                case 'tcp':
                case 'lan':
                case 'dq':
                    word = word.toUpperCase()
                    break
                case 'qualy':
                    word = 'Qualify'
                    break
                case 'sec':
                    word = 'Seconds'
                    break
                default:
                    word = word[0].toUpperCase() + word.slice(1)
            }
        }
        words[i] = word
    }

    return words.join(' ')
}