import React from "react";
import { MdSearch } from "react-icons/md";
import { Form } from "reactstrap";
import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "../../lib/styleUtil";
import Input from "@material-ui/core/Input";
const StyleInput = styled(Input)`
  &:focus {
    border: none;
    outline: none;
  }
`;
const StyleSearch = styled(MdSearch)`
  &:focus {
    border: none;
    outline: none;
  }
`;
const SearchInput = () => {
  return (
    <Form
      inline
      className="cr-search-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <StyleSearch
        size="20"
        className="cr-search-form__icon-search"
        color={oc.blue[6]}
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
  );
};

export default SearchInput;
