import React, { Component, useState } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  PhoneButton,
  AuthError,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "redux/modules/auth";
import * as baseActions from "redux/modules/base";
import * as footActions from "redux/modules/foot";
import { isEmail, isLength } from "validator";
import debounce from "lodash/debounce";
import storage from "lib/storage";
import * as UserActions from "redux/modules/user";
import { valid } from "semver";

class ClassRegister extends Component {
    
}