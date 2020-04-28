<?php

/**
 * Copyright 2018 Google Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License version 2 as published by the
 * Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

namespace Drupal\apigee_api_catalog_extensions\Plugin\Field\FieldFormatter;

use Drupal\apigee_api_catalog\Entity\ApiDocInterface;
use Drupal\apigee_api_catalog\Plugin\Field\FieldFormatter\SmartDocsFormatter;
use Drupal\Core\Field\FieldItemListInterface;

class SmartDocsFormatterExtension extends SmartDocsFormatter {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = parent::viewElements($items, $langcode);

    $entity = $items->getEntity();

    $elements['#attached']['library'][] =
        'apigee_api_catalog_extensions/smartdocs_sdk_generation';

    return $elements;
  }
}
