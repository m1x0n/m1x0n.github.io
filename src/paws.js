class PawsProgressBar {
    timer
    bar
    value
    max
    delay
    defaultValue
    constructor(
        max = 5,
        bar = '🐾',
        delay = 500,
        defaultValue = 'Load more 🐾'
    ) {
        this.timer = null
        this.value = []
        this.bar = bar
        this.max = max
        this.delay = delay
        this.defaultValue = defaultValue
    }
    start() {
        this.value = [this.bar]
        this.timer = setInterval(() => this.advance(), this.delay)
    }
    end() {
        clearInterval(this.timer)
        this.timer = null
    }
    advance() {
        if (this.value.length === this.max) {
            this.value = [this.bar]
            return
        }

        if (this.value.length > 0 && this.value.length < this.max) {
            this.value.push(this.bar)
        }
    }
    val() {
        return this.timer
            ? this.value.join('')
            : this.defaultValue
    }
}

export default PawsProgressBar
