function greeter(person: string) {
    return "Hello, " + person;
}

var user = "How's it going folks?";

document.body.innerHTML = greeter(user);