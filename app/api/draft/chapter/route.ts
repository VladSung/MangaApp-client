// route handler with secret and slug
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    // Parse query string parameters
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');
    const images = searchParams.get('images');

    // Check the secret and next parameters
    // This secret should only be known to this route handler and the CMS

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    const post = slug;

    // If the slug doesn't exist prevent draft mode from being enabled
    if (!post) {
        return new Response('Invalid slug', { status: 401 });
    }

    // Enable Draft Mode by setting the cookie
    draftMode().enable();

    // Redirect to the path from the fetched post
    // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
    return new Response();
}
