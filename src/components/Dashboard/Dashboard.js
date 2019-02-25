import React, {Component}from 'react';

class Dashboard extends Component{

    render(){
        return(
            <main class='site-content admin'>
                <section class="site-index">
                    <h1>Adoption requests</h1>
                    <table>
                        <thead>
                            <th>#</th>
                            <th>Dog ID</th>
                            <th>User ID</th>
                            <th>Status</th>
                            <th>Update</th>
                        </thead>
                        <tr>
                            <td>1</td>
                            <td><a href="details.html">5c6018ff2cbf650698471b5c</a></td>
                            <td><a href="#">5c60192a2cbf650698471b5d</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><a href="details.html">5c52fadacd7ced417c313db0</a></td>
                            <td><a href="#">5c52faf0cd7ced417c313db1</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><a href="details.html">5c52fb06cd7ced417c313db2</a></td>
                            <td><a href="#">5c52fb3acd7ced417c313db4</a></td>
                            <td>Approved</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><a href="details.html">5c52fb51cd7ced417c313db5</a></td>
                            <td><a href="#">5c60192a2cbf650698471b5d</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><a href="details.html">5c52fc0ecd7ced417c313db8</a></td>
                            <td><a href="#">5c52fc2acd7ced417c313db9</a></td>
                            <td>Cancelled</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><a href="details.html">5c52fb06cd7ced417c313db2</a></td>
                            <td><a href="#">5c52fb3acd7ced417c313db4</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td><a href="details.html">5c6018ff2cbf650698471b5c</a></td>
                            <td><a href="#">5c60192a2cbf650698471b5d</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
            
                        </tr>
                        <tr>
                            <td>8</td>
                            <td><a href="details.html">5c52fadacd7ced417c313db0</a></td>
                            <td><a href="#">5c52faf0cd7ced417c313db1</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td><a href="details.html">5c52fb06cd7ced417c313db2</a></td>
                            <td><a href="#">5c52fb3acd7ced417c313db4</a></td>
                            <td>Approved</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td><a href="details.html">5c52fb51cd7ced417c313db5</a></td>
                            <td><a href="#">5c60192a2cbf650698471b5d</a></td>
                            <td>Pending</td>
                            <td><button class="button button-revelse">Approve</button><button class="button button-revelse cancelle">Cancelle</button></td>
                        </tr>
                    </table>
                </section>
            </main>
        );
    }
}

export default Dashboard;