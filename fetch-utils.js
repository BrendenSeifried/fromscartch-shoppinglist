const SUPABASE_URL = 'https://tbzaipzkyiuqlhxtbclu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiemFpcHpreWl1cWxoeHRiY2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0NjIsImV4cCI6MTk1OTkxNzQ2Mn0.41zG4q5-OKD_FaQliXTAUAedWspG6p7sgoszhCsQ3X4';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}
//--------------------------------------------------------------------------------------------
export async function completeItem(id) {
    const response = await client.from('groceries').update({ complete: true }).match({ user_id: client.auth.user().id, id: id });
    return checkError(response);
}

export async function getItems() {
    const response = await client.from('groceries').select().order('complete').match({ user_id: client.auth.user().id });
    console.log(response);
    return checkError(response);
}

export async function createItem(item) {
    const response = await client.from('groceries').insert({ description: item, complete: false, user_id: client.auth.user().id });
    console.log(response, 'testing');
    return checkError(response);
}


export async function deleteAllItems() {
    const resp = await client.from('groceries').delete().match({ user_id: client.auth.user().id });
    return checkError(resp);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
