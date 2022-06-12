class Cat {
    #content
    constructor(content) {
        this.#content = content
    }
    content() {
        return this.#content
    }
}
class CatOrError {
    #cat
    #error
    constructor(cat = null, error = null) {
        this.#cat = cat
        this.#error = error
    }
    static fromCat(cat) {
        return new this(cat, null)
    }
    static fromError(error) {
        return new this(null, error)
    }
    isOk() {
        return !this.#error
    }
    isError() {
        return !this.isOk()
    }
    cat() {
        return this.#cat
    }
    error() {
        return this.#error
    }
}

class CatProvider {
    constructor(endpoint = '', options = {}) {
        this.endpoint = endpoint
        this.options = options
    }

    async getCatOrError() {
        return Promise.resolve(
            CatOrError.fromError(
                new Error("Must be implemented")
            )
        )
    }
}

class CatAAS extends CatProvider {
    constructor() {
        super("https://cataas.com/cat/gif?json=true", {});
        this.name = 'cataas'
    }
    async getCatOrError() {
        return fetch(this.endpoint)
            .then((response) => {
                return response.json()
            })
            .then(data => {
                return Promise.resolve(
                    CatOrError.fromCat(
                        new Cat("https://cataas.com/cat/" + data.id)
                    )
                )
            })
            .catch(error => {
                return Promise.resolve(
                    CatOrError.fromError("[" + this.name + "] " + error.toString())
                )
            })
    }
}

class TheCatApi extends CatProvider {
    constructor() {
        super("https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif", {key: "DEMO-API-KEY"});
        this.name = 'thecatapi'
    }
    async getCatOrError() {
        return fetch(this.endpoint, {headers: {"x-api-key": this.options.key}})
            .then((response) => {
                return response.json()
            })
            .then(data => {
                return Promise.resolve(
                    CatOrError.fromCat(
                        new Cat(data[0].url)
                    )
                )
            })
            .catch(error => {
                return Promise.resolve(
                    CatOrError.fromError("[" + this.name + "] " + error.toString())
                )
            })
    }
}

class Giphy extends CatProvider {
    constructor() {
        super("https://api.giphy.com/v1/gifs/random?tag=cat&rating=g", {key: 'atSc6rXC6mkBvhxFJN5TT04lH6Y3uixi'});
        this.name = 'giphy'
    }
    async getCatOrError() {
        return fetch(this.endpoint + `&api_key=${this.options.key}`)
            .then((response) => {
                return response.json()
            })
            .then(data => {
                return Promise.resolve(
                    CatOrError.fromCat(
                        new Cat(data.data.images.downsized.url)
                    )
                )
            })
            .catch(error => {
                return Promise.resolve(
                    CatOrError.fromError("[" + this.name + "] " + error.toString())
                )
            })
    }
}

// Testing provider
class ErrorProvider extends CatProvider {
    constructor() {
        super('', {})
    }
    async getCatOrError() {
        return Promise.resolve(
            CatOrError.fromError(
                new Error("Errrooorrr!")
            )
        )
    }
}

// Default image
class CatFallback {
    #content
    constructor(content) {
        this.#content = content
    }
    cat() {
        return new Cat(this.#content)
    }
}

class CatProviderPool {
    // Pool of cat providers
    #providers
    #fallback
    constructor(providers, fallback) {
        this.#providers = providers
        this.#fallback = fallback
    }
    async tryGet(providerID, attempt, maxAttempts) {
        let provider = this.#providers[providerID]
        console.log("Attempt: %d of %d. Trying %s provider", attempt, maxAttempts, provider.name)

        let result = await provider.getCatOrError()

        if (result.isError()) {
            console.log(result.error().toString())
            if (attempt + 1 > maxAttempts) {
                return Promise.resolve(this.#fallback.cat())
            }

            let nextProviderID = function(id) {
                return {0:1,1:2,2:0}[id]
            }(providerID)

            return this.tryGet(nextProviderID, attempt+1, maxAttempts)
        }

        return Promise.resolve(result.cat())
    }
    async getCat() {
        const maxAttempts = 3
        let attempt = 1
        let providerID = Date.now() % 3

        return this.tryGet(providerID, attempt, maxAttempts)
    }
    getFallbackCat() {
        return this.#fallback.cat()
    }
}

import catPlaceholder from "./assets/placeholder.gif"

const catProviderPool = new CatProviderPool(
    [
        new TheCatApi(),
        new CatAAS(),
        new Giphy()
    ],
    new CatFallback(catPlaceholder)
)

export default catProviderPool
