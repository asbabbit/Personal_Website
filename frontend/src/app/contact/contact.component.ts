import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
 
  constructor(
    private titleService: Title,
    private http: HttpClient
  ) {
    this.titleService.setTitle('Alma Babbitt - Contact');
  }
  
  onSubmit() {
    // Form validation
    if (!this.contactData.fullName || !this.contactData.email || !this.contactData.message) {
      this.submitMessage = 'Please fill out all fields';
      this.submitSuccess = false;
      return;
    }
    
    // Show loading state
    this.isSubmitting = true;
    this.submitMessage = '';
    
    // Send to backend API - use relative URL to work with your existing server setup
    this.http.post('/api/contact', this.contactData)
      .subscribe(
        (response: any) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.submitMessage = response.message || 'Thank you for your message! I will get back to you soon.';
          
          // Reset form after successful submission
          this.contactData = {
            fullName: '',
            email: '',
            message: ''
          };
        },
        (error) => {
          this.isSubmitting = false;
          this.submitSuccess = false;
          this.submitMessage = error.error?.message || 'Failed to send message. Please try again.';
          console.error('Error submitting form:', error);
        }
      );
  }
}