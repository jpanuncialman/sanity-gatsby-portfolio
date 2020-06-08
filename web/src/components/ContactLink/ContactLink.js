import React, { useState, useEffect, useRef } from 'react';

import {
    StyledContainer,
    StyledContactLink
} from './ContactLinkStyles'

const ContactLink = props => {
    
    return (
        <StyledContainer >
            <StyledContactLink href="/contact/">
                Contact
            </StyledContactLink>
        </StyledContainer>
    );
  }

export default ContactLink