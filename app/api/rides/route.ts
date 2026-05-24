export async function POST(req: Request) {
  const body = await req.json();

  console.log("NEW RIDE REQUEST:");
  console.log(body);

  return Response.json({
    success: true,
    message: "Ride request received",
  });
}