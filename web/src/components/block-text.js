import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import serializers from './serializers'

const BlockText = ({blocks, className}) => <BaseBlockContent className={className} blocks={blocks} serializers={serializers} />

export default BlockText
