# Video Recording and Upload Setup

This guide will help you set up video recording and uploading functionality with user association in your Supabase project.

## Prerequisites

1. A Supabase project with authentication enabled
2. The `form-video` bucket created in your Supabase storage
3. The necessary Expo packages installed (already done)

## Database Setup

### 1. Create the Videos Table

Run the SQL migration in your Supabase SQL editor:

```sql
-- Copy and paste the contents of client/supabase/migrations/create_videos_table.sql
```

This will:

- Create a `videos` table to store video metadata
- Link videos to users via `user_id` foreign key
- Enable Row Level Security (RLS) so users can only access their own videos
- Create indexes for better performance
- Set up automatic timestamp updates

### 2. Storage Bucket Configuration

Make sure your `form-video` bucket has the following settings:

1. **Public bucket**: Set to `true` if you want videos to be publicly accessible
2. **File size limit**: Set appropriate limits (e.g., 100MB)
3. **Allowed MIME types**: Add `video/*` to allow video files

### 3. Storage Policies

Add the following RLS policies to your `form-video` bucket:

```sql
-- Allow authenticated users to upload videos
CREATE POLICY "Allow authenticated users to upload videos" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to view their own videos
CREATE POLICY "Allow users to view their own videos" ON storage.objects
FOR SELECT USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own videos
CREATE POLICY "Allow users to delete their own videos" ON storage.objects
FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
```

## How It Works

### User Association

1. **File Naming**: Videos are saved with the user's ID as a prefix: `{user_id}-{timestamp}.mp4`
2. **Database Records**: Each video gets a record in the `videos` table with the user's ID
3. **Row Level Security**: Users can only see, upload, update, and delete their own videos
4. **Storage Policies**: Storage access is controlled by user authentication

### Video Recording Flow

1. User opens the video recording page
2. Camera permissions are requested
3. User records a video (max 60 seconds)
4. Video is previewed with upload/retake options
5. On upload:
   - Video is uploaded to Supabase storage with user-specific filename
   - Metadata is saved to the `videos` table
   - User is redirected to their video list

### Security Features

- **User Isolation**: Users can only access their own videos
- **File Validation**: Only video files are accepted
- **Size Limits**: Configurable file size limits
- **Authentication Required**: All operations require user authentication

## Usage

1. Navigate to the home page
2. Click "Record Videos"
3. Grant camera permissions when prompted
4. Record your video
5. Preview and upload
6. View your uploaded videos in the "My Videos" tab

## Troubleshooting

### Common Issues

1. **Permission Denied**: Make sure camera and media library permissions are granted
2. **Upload Failed**: Check your Supabase storage bucket configuration and policies
3. **Database Errors**: Ensure the `videos` table is created and RLS policies are in place

### Environment Variables

Make sure your environment variables are set correctly:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

## File Structure

```
client/src/
├── components/
│   └── functional/
│       ├── VideoRecorder.tsx    # Video recording component
│       └── VideoList.tsx        # Video list component
├── app/
│   ├── index.tsx               # Home page with navigation
│   └── videos.tsx              # Video management page
└── supabase/
    └── migrations/
        └── create_videos_table.sql  # Database migration
```

## Customization

You can customize the following:

- **Video Quality**: Modify `VideoRecordingOptions` in `VideoRecorder.tsx`
- **Max Duration**: Change the `maxDuration` value (currently 60 seconds)
- **File Size Limits**: Adjust in Supabase storage settings
- **UI/UX**: Modify the components to match your app's design
