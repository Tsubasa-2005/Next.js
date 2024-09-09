import { NextResponse } from 'next/server';
import {updateUser} from "@/api/users";

export async function PUT(request: Request) {
    try {
        const { id, email, name } = await request.json(); // Extract the data from the request body

        // Call the backend to update the user information
        const result = await updateUser(id, email, undefined, name); // Only update email and name

        if (result === null) {
            // Return a success response
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            // Return an error response if updating fails
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}