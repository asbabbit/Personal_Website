import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactData = {
    fullName: '',
    email: '',
    message: ''
  };
  
  constructor(private titleService: Title) {
    this.titleService.setTitle('Alma Babbitt - Contact');
  }

  onSubmit() {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', this.contactData);
    
    // Reset form after submission
    this.contactData = {
      fullName: '',
      email: '',
      message: ''
    };

    // Show success message (in a real app, you'd want to handle this better)
    alert('Thank you for your message! I will get back to you soon.');
  }
}