import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}
// DESATIVA TEMPORARIAMENTE PROTEÇÃO DAS ROTAS
// TODO: Implementar proteção de rotas usando o token JWT armazenado no localStorage do navegador.
export const config = {
  matcher: [],
};