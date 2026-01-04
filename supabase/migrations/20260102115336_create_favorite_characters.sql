create table public.favorite_characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_id int not null,
  character_name text not null,
  character_image text,
  created_at timestamp with time zone default now()
);

alter table public.favorite_characters
add constraint unique_user_character
unique (user_id, character_id);

alter table public.favorite_characters enable row level security;

create policy "Read own favorites"
on public.favorite_characters
for select
using (auth.uid() = user_id);

create policy "Insert own favorites"
on public.favorite_characters
for insert
with check (auth.uid() = user_id);

create policy "Delete own favorites"
on public.favorite_characters
for delete
using (auth.uid() = user_id);
