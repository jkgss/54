# Backend & Dashboard Implementation Plan

## 1. Overview & Technology Stack
- **Database & Backend:** Supabase (PostgreSQL, Edge Functions, Storage Buckets, Authentication)
- **UI/UX Guidelines:** 
  - Unique pages with specific slugs for user/admin flows.
  - Modals restricted to confirmations and quick, small field edits.
  - Global screen toast notifications configured to show on the top-left.
  - Branding should follow the existing landing page look & feel.
  - Use **shadcn/ui** components as the primary reference for UI elements.
- **Payments:** Deferred (Stripe integration to be considered in a future phase).

## 2. Page Architecture

### 2.1 General User Pages
- `/login` - User authentication.
- `/signup` - Registration flow.
- `/logout` - Session termination.
- `/profile` - User profile details and management.

### 2.2 Client Pages
*(Accessible by users with the 'client' role)*
- `/client/dashboard` - Overview of upcoming bookings, quick actions, and personal statistics.
- `/client/bookings` - Detailed booking management (view schedule, book new sessions, cancel existing ones).
- `/client/history` *(Suggested)* - Log of past sessions attended.

### 2.3 Admin Pages
*(Accessible strictly by users with the 'admin' role)*
- `/admin/dashboard` - High-level overview (active upcoming sessions, recent signups, system health).
- `/admin/sessions` - CRUD operations for sessions and session types. Includes scheduling and availability management.
- `/admin/bookings` - Sitewide booking directory and management.
- `/admin/bookings/[id]` - Detailed view for a specific booking.
- `/admin/clients` - User management table (view all users, update roles, ban/reject users).
- `/admin/clients/[id]` - Detailed view for a specific client profile and history.
- `/admin/reporting` - View and export historical data logs (logins, session tracking, booking history).
- `/admin/settings` - Global app settings and administrative configurations.

## 3. Database Schema & Tables

### 3.1 Users & Roles
*Supabase Auth will handle core auth. A public `profiles` table will link to `auth.users`.*
- **`profiles`**
  - `id` (UUID, references auth.users)
  - `role` (Enum: `user`, `client`, `admin` - defaults to `user`)
  - `status` (Enum: `active`, `rejected`, `banned`)
  - `first_name`, `last_name`
  - `address_line1`, `address_line2`, `post_code`, `city`, `county`, `country`
  - `phone_prefix`, `phone_number`
  - `created_at`, `updated_at`

### 3.2 Sessions & Scheduling
- **`session_types`**
  - `id`, `name`, `description`, `created_at`
- **`sessions`**
  - `id`
  - `type_id` (refs `session_types`)
  - `title`, `description`
  - `max_slots`, `pricing`, `location`
  - `status` (Enum: `active`, `cancelled`, `completed`)
  - `created_at`, `updated_at`
- **`availability_rules`** (For recurring or specific availability periods)
  - `id`
  - `session_id` (refs `sessions`)
  - `is_ongoing` (Boolean)
  - `start_date`, `end_date` (If not ongoing)
  - `day_of_week`
  - `start_time`, `end_time`
- **`availability_exceptions`** (Overrides rules)
  - `id`, `session_id`
  - `exception_date`
  - `is_cancelled` (Boolean - true if trainer is sick/unavailable)
  - `start_time`, `end_time` (For modified hours)

### 3.3 Bookings
- **`bookings`**
  - `id`
  - `user_id` (refs `profiles`)
  - `session_id` (refs `sessions`)
  - `status` (Enum: `pending`, `confirmed`, `cancelled`, `attended`, `no_show`)
  - `cancel_reason` (Text, optional)
  - `cancel_datetime` (Timestamp, set if cancelled)
  - `created_at`

### 3.4 History & Auditing
- **`login_history`**
  - `id`, `user_id`, `login_timestamp`, `ip_address`, `user_agent`
- **`session_history`**
  - `id`, `session_id`, `action` (e.g., 'created', 'updated', 'cancelled')
  - `changed_by` (refs `profiles`)
  - `previous_state` (JSON), `new_state` (JSON)
  - `changed_at`
- **`bookings_history`**
  - `id`, `booking_id`, `action`, `previous_status`, `new_status`
  - `changed_by`, `changed_at`
- **`user_role_history`** *(Suggested)*
  - `id`, `user_id`, `previous_role`, `new_role`, `changed_by`, `changed_at`

## 4. Workflows & Business Logic

### 4.1 Role Transitions
- **New Signup:** User lands in `auth.users` and a trigger creates a `profiles` record with role `user`.
- **First Booking:** When a `user` successfully books their first session, a trigger/Edge Function updates their role to `client`.
- **Admin Actions:** Admins can manually override roles to `admin`, ban a user (updating profile status to `banned`), or reject a pending request.

### 4.2 Storage & Media
- Supabase Buckets will manage:
  - User avatars.
  - Session thumbnails/images.
  - PDF attachments (e.g., waivers, custom client programs).

## 5. Development Steps

### Phase 1: Supabase Setup
- [x] Initialize Supabase project.
- [x] Expose environment variables to the frontend.
- [x] Establish SQL DDL for schemas, tables, and Enums.
- [x] Configure Row Level Security (RLS) policies.
- [x] Set up database triggers for tracking history and updating roles automatically (e.g., `user` to `client` on first booking).
- [x] Create storage buckets with accurate RLS policies (e.g., private `avatars`).

### Phase 2: Core Frontend & Auth
- [x] Install UI dependencies (shadcn/ui for Modals, Tables, Forms, and Toasts configured to top-left).
- [x] Create base layouts integrating the existing branding guide.
- [x] Implement `/signup`, `/login`, `/logout` flows bridging with Supabase Auth.
- [x] Create role-based route guards in the application framework.
- [x] Create `ProfilePage` (`/profile`) accessible by all users.
- [x] Update root Landing Page to replace dashboard button with a User Profile dropdown (with avatar, 'Profile', and 'Log Out' links).
- [x] Expand `ProfilePage` to incorporate full interactive editing mappings for identity, contact, and physical coordinate attributes.

### Phase 3: Admin Modules & Advanced UI
- [x] Build the basic `/admin/dashboard` layout (including Collapsible Sidebar).
- [ ] Add Breadcrumbs Navigation to nested admin views.
- [ ] Implement a Real-Time Notification Center in the header.
- [ ] Add Trend Indicators with Date Range Filters to overview summary cards.
- [ ] Implement Contextual Quick Actions (e.g., in headers and tables).
- [ ] Implement `/admin/clients` to test reading user data and updating roles/status.
- [ ] Build `/admin/sessions` for full CRUD + Availability Calendar management.
- [ ] Implement `/admin/bookings` to monitor and manage all reservations.
- [ ] Add history/reporting data tables.

### Phase 4: Client Modules
- Construct `/client/dashboard`.
- Build the booking flow in `/client/bookings`, ensuring capacity checks against `max_slots` and `availability_rules`.
- Add cancellation capability including capturing the cancellation reason and timestamp.

### Phase 5: Polish & Final Integrations
- Edge Functions hookups for complex operations if needed (e.g., sending email confirmations).
- Comprehensive UI/UX review (slugs, modal constraints, branding alignment).
- QA Testing (RLS constraints, role transitions, history logging logic).
