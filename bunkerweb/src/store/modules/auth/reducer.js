export default function auth(state = null, action) {

    switch (action.type) {
        case 'CREDENTIALS':
            console.tron.log("Ae caraio");
            return null;
        case "SIGNINGIN":
            console.tron.log("Is signing in, wait for it");
            return null;
        default:
            return state
    }
}