server:
	deno run --allow-net=:80 --allow-read server.ts

dev-server:
	deno run --allow-net=:8080 --allow-read --watch server.ts --debug

docs:
	deno run --allow-write --allow-read update_docs.ts