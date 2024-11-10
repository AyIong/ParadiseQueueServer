import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() disabled?: boolean | null;
  @Input() selected?: boolean | null;
  @Input() fluid?: boolean;
  @Input() color?: string;
  @Input() icon?: string;
  @Input() link?: string;
  @Output() onClick = new EventEmitter<void>();

  onClickHandler(): void {
    if (this.disabled) {
      return;
    }

    if (this.link) {
      window.open(this.link, '');
    } else {
      this.onClick.emit();
    }
  }

  get colorClass(): string {
    return this.color ? `Button--color-${this.color}` : 'Button--color-default';
  }
}
