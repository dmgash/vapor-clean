import Vapor

let drop = Droplet()

drop.get("/") { request in
    return try drop.view.make("index.html")
}

drop.serve()
