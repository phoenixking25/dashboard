// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HTMLInputEvent, KdFile} from '@api/frontendapi';

@Component({
  selector: 'kd-upload-file',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
})
export class UploadFileComponent {
  @Input() label: string;
  @Output() onLoad = new EventEmitter<KdFile>();
  filename: string;

  onChange(event: HTMLInputEvent): void {
    if (event.target.files.length > 0) {
      this.readFile(event.target.files[0]);
    }
  }

  readFile(file: File): void {
    this.filename = file.name;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const content = (event.target as FileReader).result;
      this.onLoad.emit({
        name: this.filename,
        content,
      } as KdFile);
    };
    if (file instanceof ArrayBuffer) {
      // throw an error, 'cause you can't handle this
    } else {
      reader.readAsText(file);
    }
  }
}
