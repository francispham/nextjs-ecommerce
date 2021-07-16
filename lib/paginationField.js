import { PAGINATION_QUERY } from '../components/Pagination';

// https://www.apollographql.com/docs/react/pagination/core-api/
export default function paginationField() {
  return {
    // ?  Tell Apollo we will take care of everything!  
    keyArgs: false, // * Docs: https://www.apollographql.com/docs/react/pagination/key-args/
    read(existing =[], { args, cache }) {
      const { skip, first } = args;

      // ?  Read the number of items on the Page from the Cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // ?  Check for existing items:
      const items = existing.slice(skip, skip + first).filter(x => x); // * .filter is for return and Array of none 'undefined' Items!
      
      // ? If not enough Items to satisfy number of Items requested on the Last Page!
      if (items.length && items.length !== first && page === pages) return items;

      // ? If NO Item, must fetch from the Network!
      if (items.length !== first) return false;

      // ? If items, just return them from the Cache, and don't need to go to the Network 
      if (items.length) {
        console.log(
          `There are ${items.length} items in the Cache! Gotta send them to Apollo`
        );
        return items;
      }
      return false; // ? Fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;

      // ?  This run when the Apollo client comes back from the network with our product
      console.log(`Merging Items from the Network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for( let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      };

      // ? Return the merged Items from the Cache => go back to read Function!
      return merged;
    },
  }
}