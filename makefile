server:
	deno run --allow-net --allow-read server.ts

readme:
	deno run --allow-write --allow-read update_readme.ts