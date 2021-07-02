import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RendererService } from '../renderer.service';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnInit {
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private rendererService: RendererService) {}

  ngOnInit(): void {
    this.rendererService.createScene(this.rendererCanvas);
    this.rendererService.animate();
  }
}
