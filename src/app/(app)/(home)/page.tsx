import { getPayload } from "payload";
import configPromise from '@payload-config';

/**
 * React server component that fetches and displays all entries from the 'categories' collection using Payload CMS.
 *
 * The retrieved data is rendered as a formatted JSON string within a padded div.
 *
 * @returns A JSX element containing the formatted JSON data from the 'categories' collection.
 */
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
