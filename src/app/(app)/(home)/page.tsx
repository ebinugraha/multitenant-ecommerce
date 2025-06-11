import { getPayload } from "payload";
import configPromise from '@payload-config';

export default async function Home() {

  const payload = await getPayload({
    config: configPromise
  })

  const data = await payload.find({
    collection: 'categories'
  })

  return (
    <div className="p-10">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
