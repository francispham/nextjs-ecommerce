import gql from "graphql-tag";
import { useRouter } from 'next/router'

// https://www.downshift-js.com/downshift
import { resetIdCounter, useCombobox } from 'downshift';

// https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery
import { useLazyQuery } from "@apollo/client";

// https://www.geeksforgeeks.org/lodash-_-debounce-method/
import debounce from "lodash.debounce";

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm },
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }  
    }
  }
`;

export default function Search() {
  const router = useRouter();

  // ? useLazyQuery() will not run when the component is rendered, it will only run when the query changes!
  const [findItems, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    //  * Docs: https://www.apollographql.com/docs/react/api/react/hooks/#fetchpolicy
    fetchPolicy: 'no-cache',  // ? 'no-cache' will not store data in Apollo cache, it goes directly to the network
  });
  const searchedItems = data?.searchTerms || [];

  // ? _debounce() method help to prevent multiple network requests by delaying the execution of the query for 350ms
  const delayFindItems = debounce(findItems, 350);

  // ? Reset the id counter to avoid id conflicts
  resetIdCounter(); //  * Docs: https://github.com/downshift-js/downshift#resetidcounter

  // * Docs: https://www.downshift-js.com/use-combobox
  const { 
    isOpen, 
    inputValue, 
    getMenuProps, 
    getInputProps, 
    getComboboxProps, 
    getItemProps, 
    highlightedIndex,
  } = useCombobox({
    items: searchedItems,
    onInputValueChange() {
      delayFindItems({
        variables: {
          searchTerm: inputValue
        }
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log(selectedItem);
      router.push(`/product/${selectedItem.id}`);
    },
    itemToString: item => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input {...getInputProps({
          placeholder: 'Search for an Item',
          type: 'search',
          id: 'search',
          className: loading ? 'loading' : '',
        })}/>
        <DropDown {...getMenuProps()}>
          {isOpen && searchedItems.map((item, index) => (
            <DropDownItem 
              key={item.id}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item })} 
            >
              <img 
                src={item.photo?.image?.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
          {isOpen && !searchedItems.length && !loading && (
            <DropDownItem>Sorry, No Items found for {inputValue}</DropDownItem>
          )}
        </DropDown>
      </div>
    </SearchStyles>
  );
};